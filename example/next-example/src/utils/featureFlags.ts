'use client'
import { useFeatureFlagsContext } from '@/context'
import { getStaticAllFeaturesFlags } from 'amberflag-library'

export const key = 'c36d60de-27b7-401d-af5a-41fe2d3f0567'
export const token = 'ac9f3cd6-06a3-49a9-b465-90f33e29e845'
export const env = 'dev'
export const featureFlags: any = {
  'icon-redesign': false,
  'color-change': false,
  'title-change': false
}

export const manageFeatureFlags = async () => {
  try {
    const featureFlagsActivated = await getStaticAllFeaturesFlags({
      token,
      key,
      env
    })

    for (const flagIndex of Object.keys(featureFlags)) {
      featureFlags[flagIndex] = featureFlagsActivated.indexOf(flagIndex) !== -1
    }
    return featureFlags
  } catch (err) {
    console.log(err)
  }
}
