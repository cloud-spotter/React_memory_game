# Security Headers Explanation

The following headers are set in the project's `_headers` file for Cloudflare Pages:

- `X-Frame-Options: DENY`
  Prevents the application pages from being displayed in iframes, protecting against clickjacking attacks.

- `X-Content-Type-Options: nosniff`
  Prevents MIME type sniffing, ensuring browsers use the declared Content-Type of the application's resources.

- `Referrer-Policy: strict-origin-when-cross-origin`
  Controls how much referrer information is included with requests:
  - Sends full URL for same-origin requests
  - Sends only the origin for cross-origin requests
  - Sends no referrer when downgrading from HTTPS to HTTP

- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  Explicitly disables access to camera, microphone, and geolocation APIs for all origins.
  An empty list () means no origins are allowed to use these features.

- `X-Robots-Tag: noindex`
  Prevents page.dev deployments from showing in online search results. Prevents search engines from indexing the Cloudflare Pages default subdomain (typically used for testing and staging).

## Verifying headers are applied correctly

After deployment, you can verify that these headers are applied using browser developer tools or HTTP checker tools such as Postman or curl. 

### Verifying headers with curl

Run this in your command-line, replacing the URL with the relevant Cloudflare Pages URL:

curl -I https://your-site-name.pages.dev

- The -I flag tells curl to fetch only the headers
- The command will display all the response headers, including the security headers set above.

### Verifying headers with Postman

1. Open Postman and create a new request.
2. Enter the site's URL.
3. Set the request method to GET.
4. Send the request.
5. In the response section, locate the "Headers" tab.
6. All response headers will be listed there, including the above security headers.

It's a good idea to test the headers on different pages to check they're applied globally. Also to compare with and without 'www' (if 'www' is used in the domain, check both versions for consistent headers).