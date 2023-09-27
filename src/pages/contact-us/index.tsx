import { FC } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contacts from '@/components/Contacts';

const ContactUs: FC = () => {
  return (
    <>
      <Head>
        <title>GitTrackr | Contact Us</title>
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
