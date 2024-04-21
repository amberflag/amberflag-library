'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useFeatureFlagsContext } from '@/context'
import { env, key, manageFeatureFlags, token } from '@/utils/featureFlags'
import { useEffect, useState } from 'react'
import { getDynamicAllFeaturesFlags } from 'amberflag-library'

export default function Home() {
  const [isLoading, setLoading] = useState(false)
  const { featureFlags, setFeatureFlags } = useFeatureFlagsContext()

  useEffect(() => {
    if (featureFlags) {
      Object.keys(featureFlags)?.map(featureName =>
        getDynamicAllFeaturesFlags({
          key,
          token,
          env,
          featureFlag: featureName,
          callback: (isActivate: boolean) => {
            setFeatureFlags?.({ ...featureFlags, [featureName]: isActivate })
          }
        })
      )
    }
  }, [featureFlags])

  useEffect(() => {
    setLoading(true)
    manageFeatureFlags()
      .then(features => {
        setFeatureFlags?.(features)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [featureFlags])

  if (isLoading) {
    return null
  }

  const iconRedesignFlag = featureFlags?.['icon-redesign']
  const colorChange = featureFlags?.['color-change']
  const titleChange = featureFlags?.['title-change']

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={colorChange ? styles.codeColor : styles.code}>
            src/app/page.tsx
          </code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src={iconRedesignFlag ? '/supabase-logo-icon.svg' : '/vercel.svg'}
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src={
            iconRedesignFlag
              ? '/supabase-logo-wordmark--light.svg'
              : '/next.svg'
          }
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      {!titleChange && (
        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>Explore starter templates for Next.js.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
      )}
    </main>
  )
}
