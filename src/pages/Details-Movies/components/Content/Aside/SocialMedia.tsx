import { IExternal } from '@src/@types/__movies__/append_to_response';
import * as React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';

interface ISocialMediaProps {
  data: Pick<IExternal, 'external_ids'>;
  urlHomePage: string | null;
}

const SocialMedia: React.FunctionComponent<ISocialMediaProps> = (props) => {
  const { data, urlHomePage } = props;

  return (
    <div>
      <p className="pb-4 font-roboto text-xl text-white/80">Social Media</p>
      <div className="w-full flex gap-4">
        {!data.external_ids.facebook_id &&
          !data.external_ids.instagram_id &&
          !data.external_ids.twitter_id &&
          !urlHomePage && <span className="text-white/80 text-base italic">No official social media</span>}
        {data.external_ids.facebook_id && (
          <a
            target={'_blank'}
            rel={'noreferrer noopener'}
            href={`https://facebook.com/${data.external_ids.facebook_id}`}
            className="group"
          >
            <FaFacebook size={'32px'} className="group-hover:fill-blue-600 duration-150 transition-colors ease-in" />
          </a>
        )}
        {data.external_ids.instagram_id && (
          <a
            target={'_blank'}
            rel={'noreferrer noopener'}
            href={`https://instagram.com/${data.external_ids.instagram_id}`}
            className="group"
          >
            <FaInstagram size={'32px'} className="group-hover:fill-rose-600 duration-150 transition-colors ease-in" />
          </a>
        )}
        {data.external_ids.twitter_id && (
          <a
            target={'_blank'}
            rel={'noreferrer noopener'}
            href={`https://twitter.com/${data.external_ids.twitter_id}`}
            className="group"
          >
            <FaTwitter size={'32px'} className="group-hover:fill-sky-600 duration-150 transition-colors ease-in" />
          </a>
        )}
        {urlHomePage && (
          <a target={'_blank'} rel={'noreferrer noopener'} href={urlHomePage}>
            <FiLink size={'32px'} className="group-hover:fill-sky-600 duration-150 transition-colors ease-in" />
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialMedia;
