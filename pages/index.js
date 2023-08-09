import Link from "next/link"
import styles from "../styles/index.module.css"
import Head from "next/head"

export default function Home() {
  return (
    <div className={styles.btn}>
      <Head>
        <title>PiHelp</title>
      </Head>
      <Link href="/Normal" as="/normal">
          <a>Normal Mode</a>
      </Link>
    </div>
  )
}
