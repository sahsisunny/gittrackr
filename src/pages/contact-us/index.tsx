import { FC } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import Contacts from '@/components/Contacts';

const ContactUs: FC = () => {
  return (
    <>
      <Head>
        <title>GitTrackr | Contact-us</title>
      </Head>
      <Navbar />
      <div>
        <Contacts />
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
