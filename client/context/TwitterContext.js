import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [tweets, setTweets] = useState([])
  const router = useRouter()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount && appStatus === 'connected') return
    getCurrentUserDetails(currentAccount)
    fetchTweets()
  }, [currentAccount, appStatus])

  /**
   * Checks if there is an active wallet connection
   */
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      router.push('/')
      setAppStatus('error')
    }
  }

  /**
   * Initiates MetaMask wallet connection
   */
  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      setAppStatus('error')
    }
  }

  /**
   * Creates an account in Sanity DB if the user does not already have one
   * @param {String} userAddress Wallet address of the currently logged in user
   */
  const createUserAccount = async (userAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const userDoc = {
        _type: 'users',
        _id: userAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage:
          'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',
        walletAddress: userAddress,
      }

      await client.createIfNotExists(userDoc)
      setAppStatus('connected')
    } catch (error) {
      router.push('/')
      setAppStatus('error')
    }
  }

  /**
   * Generates NFT profile picture URL or returns the image URL if it's not an NFT
   * @param {String} imageUri If the user has minted a profile picture, an IPFS hash; if not then the URL of their profile picture
   * @param {Boolean} isNft Indicates whether the user has minted a profile picture
   * @returns A full URL to the profile picture
   */
  const getNftProfileImage = async (imageUri, isNft) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`
    } else if (!isNft) {
      return imageUri
    }
  }

  /**
   * Gets all the tweets stored in Sanity DB.
   */
  const fetchTweets = async () => {
    const query = `
      *[_type == "tweets"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        tweet,
        image {
          asset->{
            _ref,
            url
          }
        },
        timestamp,
        likes,
        dislikes,
        comments
      }|order(timestamp desc)
    `

    try {
      const sanityResponse = await client.fetch(query)
      const formattedTweets = await Promise.all(
        sanityResponse.map(async (item) => {
          const profileImageUrl = await getNftProfileImage(
            item.author.profileImage,
            item.author.isProfileImageNft,
          )

          // Handle image URL extraction if available
          const imageUrl = item.image ? item.image.asset.url : null

          return {
            tweet: item.tweet,
            timestamp: item.timestamp,
            image: imageUrl,
            author: {
              name: item.author.name,
              walletAddress: item.author.walletAddress,
              profileImage: profileImageUrl,
              isProfileImageNft: item.author.isProfileImageNft,
            },
            likes: item.likes || 0, // Default to 0 if no likes
            dislikes: item.dislikes || 0, // Default to 0 if no dislikes
            comments: item.comments || [], // Default to empty array if no comments
          }
        })
      )
      setTweets(formattedTweets)
    } catch (error) {
      console.error('Error fetching tweets:', error)
    }
  }

  /**
   * Gets the current user details from Sanity DB.
   * @param {String} userAccount Wallet address of the currently logged in user
   */
  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return

    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{
          timestamp,
          tweet,
          image {
            asset->{
              _ref,
              url
            }
          },
          likes,
          dislikes,
          comments
        },
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `

    try {
      const response = await client.fetch(query)

      // Handle the profile image URL
      const profileImageUri = await getNftProfileImage(
        response[0].profileImage,
        response[0].isProfileImageNft,
      )

      // Update currentUser with the tweet's image and other details
      setCurrentUser({
        tweets: response[0].tweets.map((tweet) => ({
          tweet: tweet.tweet,
          timestamp: tweet.timestamp,
          image: tweet.image ? tweet.image.asset.url : null, // Include image URL
          likes: tweet.likes || 0,
          dislikes: tweet.dislikes || 0,
          comments: tweet.comments || [],
        })),
        name: response[0].name,
        profileImage: profileImageUri,
        walletAddress: response[0].walletAddress,
        coverImage: response[0].coverImage,
        isProfileImageNft: response[0].isProfileImageNft,
      })
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  /**
   * Updates tweet likes in the Sanity DB.
   * @param {String} tweetId The tweet's ID
   */
  const likeTweet = async (tweetId) => {
    await client.patch(tweetId)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit()
    fetchTweets() // Refresh tweets after like action
  }

  /**
   * Updates tweet dislikes in the Sanity DB.
   * @param {String} tweetId The tweet's ID
   */
  const dislikeTweet = async (tweetId) => {
    await client.patch(tweetId)
      .setIfMissing({ dislikes: 0 })
      .inc({ dislikes: 1 })
      .commit()
    fetchTweets() // Refresh tweets after dislike action
  }

  /**
   * Adds a comment to a tweet in Sanity DB.
   * @param {String} tweetId The tweet's ID
   * @param {String} comment The comment text
   */
  const addCommentToTweet = async (tweetId, comment) => {
    if (!comment) return
    await client.patch(tweetId)
      .append('comments', [comment])
      .commit()
    fetchTweets() // Refresh tweets after comment action
  }

  return (
    <TwitterContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        tweets,
        fetchTweets,
        setAppStatus,
        getNftProfileImage,
        currentUser,
        getCurrentUserDetails,
        likeTweet,
        dislikeTweet,
        addCommentToTweet,
      }}
    >
      {children}
    </TwitterContext.Provider>
  )
}
