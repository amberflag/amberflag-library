import axios from 'axios'
import { io } from 'socket.io-client'

export const getStaticAllFeaturesFlags = async ({
  token,
  key,
  env
}: {
  token: string
  key: string
  env: string
}) => {
  try {
    const { data } = await axios.post('https://amberflag-server.onrender.com', {
      key,
      token
    })

    if (data?.data) {
      const activated = []
      const featureFlags = Object.keys(data?.data)
      for (const feature of featureFlags) {
        const envsActivated = data?.data?.[feature]
        if (envsActivated.some(activated => env === activated)) {
          activated.push(feature)
        }
      }
      return activated
    }

    return null
  } catch (error) {
    return error
  }
}

export const getDynamicAllFeaturesFlags = async ({
  token,
  key,
  env,
  featureFlag,
  callback
}: {
  token: string
  key: string
  env: string
  featureFlag: string
  callback: (isActivated: boolean) => void
}) => {
  try {
    try {
      const { data } = await axios.post(
        'https://amberflag-server.onrender.com',
        { key, token }
      )

      if (!data) {
        return callback(false)
      }

      const socket = io('https://amberflag-service.onrender.com')
      socket.on('connect', () => {
        socket.on(key, data => {
          const dataParsed = JSON.parse(data)
          if (dataParsed.name === featureFlag) {
            if (dataParsed?.changesEnv?.length) {
              if (dataParsed?.changesEnv.indexOf(env) !== -1) {
                return callback(true)
              }
            }
            return callback(false)
          }
        })
      })
    } catch (error) {
      return error
    }
  } catch (error) {
    return error
  }
}
