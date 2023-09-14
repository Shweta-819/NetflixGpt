export const LOGO = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const BG = "https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"

export const AVATAR = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`
    }
  };

export const IMG_CDN = "https://image.tmdb.org/t/p/w500"

export const SUPPORTED_LANGUAGES = [
    { identifier: "en", name: "English" },
    { identifier: "hindi", name: "Hindi" },
    { identifier: "spanish", name: "Spanish" },
]
