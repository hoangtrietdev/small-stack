import { getStack } from '../utils';
import Head from 'next/head';
import * as Devicons from 'react-icons/di';
import Link from 'next/link';
import { NextPage } from 'next';

export const getStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps = async ({ params }: any) => {
  const { name } = params;
  const stack = await getStack(name);
  return { props: { stack: stack, name: name } };
};

const Name: NextPage = ({ stack, name }: any) => {
  const DevItem = ({ item }: any) => {
    // @ts-ignore: Unreachable code error
    const ICON = Devicons[item.icon];
    return (
      <li className="flex items-center text-xl">
        <ICON className="mr-2 text-4xl" />
        {item.title}
      </li>
    );
  };

  return (
    <div className="flex min-h-screen p-8 bg-gray-100">
      <Head>
        <title>Find your guilty pleasure dev stack</title>
        <meta
          name="description"
          content="Find your guilty pleasure dev stack based on your name"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full h-auto p-8 border-4 border-white rounded-xl">
        <h1 className="mb-4 text-4xl font-black">
          Hey <span className="italic text-purple-300">{name}</span> this is it!
        </h1>
        <p className="mb-4 font-semibold">Your guilty pleasure stack!</p>
        <div className="p-4 mb-6 bg-gray-200 border-2 border-white shadow-lg rounded-xl">
          <ul>
            {stack.map((item: any, index: any) => (
              <DevItem key={index} item={item} />
            ))}
          </ul>
        </div>
        <Link href="/">
          <a className="italic underline">Find your own stack</a>
        </Link>
      </main>
    </div>
  );
};

export default Name;
