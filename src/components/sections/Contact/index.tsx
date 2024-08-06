'use client';

import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Row from '~/components/Row';
import Container from '~/components/Container';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
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
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <Row id="contact">
      <Container>
        <div className="flex flex-col gap-4 m-auto md:min-w-[500px]">
          <h2 className="text-center font-bold text-comment">Contact Me</h2>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col gap-4 text-black"
          >
            <label className="text-keyword text-2xl">Name</label>
            <input
              type="text"
              name="user_name"
              className="text-xl px-4 py-2 rounded-lg border-2 border-black"
            />
            <label className="text-keyword text-2xl">Email</label>
            <input
              type="email"
              name="user_email"
              className="text-xl px-4 py-2 rounded-lg border-2 border-black"
            />
            <label className="text-keyword text-2xl">Message</label>
            <textarea
              className="text-xl px-4 py-2 rounded-lg border-2 border-black h-48"
              name="message"
            />
            <input
              type="submit"
              value="Send"
              className="bg-common px-4 py-2 text-2xl rounded-lg border-2 border-black "
            />
          </form>
        </div>
      </Container>
    </Row>
  );
};
export default Contact;
