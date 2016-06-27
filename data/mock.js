module.exports = {
  rules: [
    {
      pattern: /\/api\/getLivelist.php\?rtype=origin$/,
      respondwith: './livelist.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=more$/,
      respondwith: './livelistmore.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=refresh$/,
      respondwith: './livelistrefresh.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=part-origin$/,
      respondwith: './part-time.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=active-origin$/,
      respondwith: './active.json'
    }
  ]
};
