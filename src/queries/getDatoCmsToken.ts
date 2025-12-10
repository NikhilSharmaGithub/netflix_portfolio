// getDatoCmsToken.ts

export const getDatoCmsToken = (): string => {
  // Temporarily commented out - no DatoCMS tokens available
  // const hostname = window.location.hostname;

  // const hostTokenMap: Record<string, string | undefined> = {
  //   'ror.sumanthsamala.com': process.env.REACT_APP_DATOCMS_ROR_TOKEN,
  //   'sumanthsamala.com': process.env.REACT_APP_DATOCMS_ROR_TOKEN,
  //   'ror.localhost': process.env.REACT_APP_DATOCMS_ROR_TOKEN,
  //   'localhost': process.env.REACT_APP_DATOCMS_ROR_TOKEN,
  //   'java.sumanthsamala.com': process.env.REACT_APP_DATOCMS_JAVA_TOKEN,
  //   'java.localhost': process.env.REACT_APP_DATOCMS_JAVA_TOKEN,
  //   'frontend.sumanthsamala.com': process.env.REACT_APP_DATOCMS_FRONTEND_TOKEN,
  //   'frontend.localhost': process.env.REACT_APP_DATOCMS_FRONTEND_TOKEN,
  //   'node.sumanthsamala.com': process.env.REACT_APP_DATOCMS_NODE_TOKEN,
  //   'node.localhost': process.env.REACT_APP_DATOCMS_NODE_TOKEN,
  // };

  // const token =
  //   hostTokenMap[hostname] ||
  //   // Generic fallback for preview/unknown hosts (e.g., Vercel previews)
  //   process.env.REACT_APP_DATOCMS_TOKEN;

  // if (!token) {
  //   const message = `No DatoCMS token configured for hostname: ${hostname}. ` +
  //     `Set REACT_APP_DATOCMS_TOKEN or the host-specific token in your .env.local.`;
  //   // Throw to surface a clear, actionable error instead of a 401 from the API.
  //   throw new Error(message);
  // }

  // return token;

  // Temporary placeholder token - replace with real token when available
  return 'placeholder-token-replace-with-real-one';
};
