import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/layout';
import Date from '../../components/date';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds(); /*
  this return an array, 
  an getStaticProps get a unique object of this array and get data

  obs: the name has to be paths
  */
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}