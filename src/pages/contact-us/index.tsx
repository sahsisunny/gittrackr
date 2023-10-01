import { FC } from 'react';
import Contacts from '@/components/Contacts';
import Layout from '@/components/Layout';

const ContactUs: FC = () => {
  return (
    <Layout title="GitTrackr | Contact Us">
      <Contacts />
    </Layout>
  );
};

export default ContactUs;
