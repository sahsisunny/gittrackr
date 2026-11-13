import { FC } from 'react';
import Contacts from '@/components/Contacts';
import Layout from '@/components/Layout';

const ContactUs: FC = () => {
  return (
    <Layout
      title="GitTrackr | Contact Engineering & Support"
      description="Get in touch with the GitTrackr maintainers and engineering team for feedback, feature requests, and partnership inquiries."
    >
      <Contacts />
    </Layout>
  );
};

export default ContactUs;
