import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        black_transparent_03: 'rgba(0, 0, 0, 0.3)',
        black_transparent_05: 'rgba(0, 0, 0, 0.5)',
        cyan:                 '#92E5BD',
        lime:                 '#F1EE33'
      },
      backgroundImage: {
        '01d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141783/horus-assets/v2/backgrounds/jzqqab6xpftzw0kx7qg8.jpg')",
        '01n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141783/horus-assets/v2/backgrounds/kz8vneyugcabxreocwi7.jpg')",
        '02d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141786/horus-assets/v2/backgrounds/kowvx9pubjjppczjhaac.jpg')",
        '02n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141784/horus-assets/v2/backgrounds/hgivsdrfzhkdplqrmqn8.jpg')",
        '03d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141784/horus-assets/v2/backgrounds/foutly0yhwyld9dibwbn.jpg')",
        '03n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141783/horus-assets/v2/backgrounds/c40zdpiqwclio7xn7mva.jpg')",
        '04d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141783/horus-assets/v2/backgrounds/un5ojwmq4cnzu52otnqr.jpg')",
        '04n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141784/horus-assets/v2/backgrounds/y62jrtstbu6sduyvvwgr.jpg')",
        '09d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141785/horus-assets/v2/backgrounds/q99tamjtpvv3vdkackcq.jpg')",
        '09n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141785/horus-assets/v2/backgrounds/cvtqnbqlqpb7whjcl333.jpg')",
        '10d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141785/horus-assets/v2/backgrounds/q99tamjtpvv3vdkackcq.jpg')",
        '10n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141785/horus-assets/v2/backgrounds/cvtqnbqlqpb7whjcl333.jpg')",
        '11d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141785/horus-assets/v2/backgrounds/q99tamjtpvv3vdkackcq.jpg')",
        '11n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141785/horus-assets/v2/backgrounds/afnjc37kbqepsneylt83.jpg')",
        '13d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141786/horus-assets/v2/backgrounds/sxbdy1xht5gylnlfenvq.jpg')",
        '13n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141785/horus-assets/v2/backgrounds/afnjc37kbqepsneylt83.jpg')",
        '50d': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141786/horus-assets/v2/backgrounds/sxbdy1xht5gylnlfenvq.jpg')",
        '50n': "url('https://res.cloudinary.com/dqvjsgezk/image/upload/v1704141785/horus-assets/v2/backgrounds/cvtqnbqlqpb7whjcl333.jpg')"
      }
    }
  },
  plugins: []
};
export default config;
