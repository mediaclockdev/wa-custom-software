import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaGitlab,
  FaDiscord,
  FaSlack,
  FaMedium,
  FaCodepen,
  FaBitbucket,
  FaDribbble,
  FaBehance,
  FaPinterest,
  FaSoundcloud,
  FaTumblr,
  FaReddit,
  FaVk,
  FaWhatsapp,
  FaSnapchat,
  FaVimeo,
  FaTiktok,
  FaFoursquare,
  FaSkype,
  FaRss,
  FaGoogle,
} from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const Social = ({ source, className }) => {
  const {
    facebook,
    twitter,
    instagram,
    youtube,
    linkedin,
    github,
    gitlab,
    discord,
    slack,
    medium,
    codepen,
    bitbucket,
    dribbble,
    behance,
    pinterest,
    soundcloud,
    tumblr,
    reddit,
    vk,
    whatsapp,
    snapchat,
    vimeo,
    tiktok,
    foursquare,
    rss,
    email,
    phone,
    address,
    skype,
    website,
    google,
  } = source;
  return (
    <ul className={className}>
      {facebook && (
        <li className="inline-block">
          <a
            aria-label="facebook"
            href={facebook}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaFacebook />
          </a>
        </li>
      )}
      {twitter && (
        <li className="inline-block">
          <a
            aria-label="twitter"
            href={twitter}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaXTwitter />
          </a>
        </li>
      )}
      {instagram && (
        <li className="inline-block">
          <a
            aria-label="instagram"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaInstagram />
          </a>
        </li>
      )}
      {youtube && (
        <li className="inline-block">
          <a
            aria-label="youtube"
            href={youtube}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaYoutube />
          </a>
        </li>
      )}
      {linkedin && (
        <li className="inline-block">
          <a
            aria-label="linkedin"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaLinkedin />
          </a>
        </li>
      )}
      {github && (
        <li className="inline-block">
          <a
            aria-label="github"
            href={github}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaGithub />
          </a>
        </li>
      )}
      {gitlab && (
        <li className="inline-block">
          <a
            aria-label="gitlab"
            href={gitlab}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaGitlab />
          </a>
        </li>
      )}
      {discord && (
        <li className="inline-block">
          <a
            aria-label="discord"
            href={discord}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaDiscord />
          </a>
        </li>
      )}
      {slack && (
        <li className="inline-block">
          <a
            aria-label="slack"
            href={slack}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaSlack />
          </a>
        </li>
      )}
      {medium && (
        <li className="inline-block">
          <a
            aria-label="medium"
            href={medium}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaMedium />
          </a>
        </li>
      )}
      {codepen && (
        <li className="inline-block">
          <a
            aria-label="codepen"
            href={codepen}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaCodepen />
          </a>
        </li>
      )}
      {bitbucket && (
        <li className="inline-block">
          <a
            aria-label="bitbucket"
            href={bitbucket}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaBitbucket />
          </a>
        </li>
      )}
      {dribbble && (
        <li className="inline-block">
          <a
            aria-label="dribbble"
            href={dribbble}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaDribbble />
          </a>
        </li>
      )}
      {behance && (
        <li className="inline-block">
          <a
            aria-label="behance"
            href={behance}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaBehance />
          </a>
        </li>
      )}
      {pinterest && (
        <li className="inline-block">
          <a
            aria-label="pinterest"
            href={pinterest}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaPinterest />
          </a>
        </li>
      )}
      {soundcloud && (
        <li className="inline-block">
          <a
            aria-label="soundcloud"
            href={soundcloud}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaSoundcloud />
          </a>
        </li>
      )}
      {tumblr && (
        <li className="inline-block">
          <a
            aria-label="tumblr"
            href={tumblr}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaTumblr />
          </a>
        </li>
      )}
      {reddit && (
        <li className="inline-block">
          <a
            aria-label="reddit"
            href={reddit}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaReddit />
          </a>
        </li>
      )}
      {vk && (
        <li className="inline-block">
          <a
            aria-label="vk"
            href={vk}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaVk />
          </a>
        </li>
      )}
      {whatsapp && (
        <li className="inline-block">
          <a
            aria-label="whatsapp"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaWhatsapp />
          </a>
        </li>
      )}
      {snapchat && (
        <li className="inline-block">
          <a
            aria-label="snapchat"
            href={snapchat}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaSnapchat />
          </a>
        </li>
      )}
      {vimeo && (
        <li className="inline-block">
          <a
            aria-label="vimeo"
            href={vimeo}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaVimeo />
          </a>
        </li>
      )}
      {tiktok && (
        <li className="inline-block">
          <a
            aria-label="tiktok"
            href={tiktok}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaTiktok />
          </a>
        </li>
      )}
      {foursquare && (
        <li className="inline-block">
          <a
            aria-label="foursquare"
            href={foursquare}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaFoursquare />
          </a>
        </li>
      )}
      {skype && (
        <li className="inline-block">
          <a
            aria-label="skype"
            href={skype}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaSkype />
          </a>
        </li>
      )}
      {website && (
        <li className="inline-block">
          <a
            aria-label="website"
            href={website}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaGlobe />
          </a>
        </li>
      )}
      {rss && (
        <li className="inline-block">
          <a
            aria-label="rss feed"
            href={rss}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaRss />
          </a>
        </li>
      )}
      {email && (
        <li className="inline-block">
          <a aria-label="email" href={`mailto:${email}`}>
            <FaEnvelope />
          </a>
        </li>
      )}
      {phone && (
        <li className="inline-block">
          <a aria-label="telephone" href={`tel:${phone}`}>
            <FaPhoneAlt />
          </a>
        </li>
      )}
      {address && (
        <li className="inline-block">
          <a
            aria-label="location"
            href={address}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaMapMarkerAlt />
          </a>
        </li>
      )}
      {google && (
        <li className="inline-block">
          <a
            aria-label="google"
            href={google}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaGoogle />
          </a>
        </li>
      )}
    </ul>
  );
};

export default Social;
