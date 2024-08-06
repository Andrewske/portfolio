'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Row from '~/components/Row';
import Container from '~/components/Container';
import SocialLinks from '~/components/SocialLinks';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!form.current) return;
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
        }
      )
      .then(
        () => {
          console.log('SUCCESS!');
          if (form.current) form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Row id="contact">
      <Container>
        <div className="flex flex-col gap-4 m-auto md:min-w-[500px] ">
          <h2 className="text-center font-bold text-comment w-full">
            Contact Me
          </h2>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col gap-4 text-black"
          >
            <label className="text-keyword text-2xl">Name</label>
            <input
              type="text"
              name="user_name"
              className="text-lg md:text-xl px-4 py-2 rounded-lg border-2 border-black"
            />
            <label className="text-keyword text-2xl">Email</label>
            <input
              type="email"
              name="user_email"
              className="text-lg md:text-xl px-4 py-2 rounded-lg border-2 border-black"
            />
            <label className="text-keyword text-2xl">Message</label>
            <textarea
              className="text-lg md:text-xl px-4 py-2 rounded-lg border-2 border-black h-48"
              name="message"
            />
            <input
              type="submit"
              value={isLoading ? 'Sending...' : 'Send'}
              className={`${
                isLoading ? 'bg-black ' : 'bg-common text-black'
              } px-4 py-2 text-2xl rounded-lg border-2 border-black`}
              disabled={isLoading}
            />
          </form>
          <SocialLinks center={true} />
        </div>
      </Container>
    </Row>
  );
};
export default Contact;
