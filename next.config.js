require('dotenv').config()
/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
	env: {
		BASE_API_URL: process.env.BASE_API_URL
	}
}
