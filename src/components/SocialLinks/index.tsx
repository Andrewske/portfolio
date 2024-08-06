import TextLink from '../TextLink';

const SocialLinks = ({ center = false }: { center?: boolean }) => {
  return (
    <div className={`flex gap-4 py-4 ${center ? 'justify-center' : ''} `}>
      <TextLink
        href="https://github.com/andrewske"
        target="_blank"
        hover={false}
      >
        <span className="icon-github text-4xl" />
      </TextLink>
      <TextLink
        href="https://www.linkedin.com/in/andrewskevin92/"
        target="_blank"
        hover={false}
      >
        <span className="icon-linkedin text-4xl" />
      </TextLink>
      <TextLink
        href="https://open.spotify.com/user/kevinbigfoot?si=87600c8f8d48475b"
        target="_blank"
        hover={false}
      >
        <span className="icon-spotify text-4xl" />
      </TextLink>
      <TextLink
        href="https://soundcloud.com/kevinbigfoot"
        target="_blank"
        hover={false}
      >
        <span className="icon-soundcloud text-4xl" />
      </TextLink>
    </div>
  );
};

export default SocialLinks;
