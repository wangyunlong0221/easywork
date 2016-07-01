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
      pattern: /\/api\/getLivelist.php\?rtype=part-more/,
      respondwith: './part-time-more.json'
    },
    {
    	pattern: /\/api\/getLivelist.php\?rtype=part-refresh/,
      respondwith: './part-time-refresh.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=active-origin$/,
      respondwith: './active.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=active_more-origin$/,
      respondwith: './active-more.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=active_refresh-origin$/,
      respondwith: './active-refresh.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=work_help-origin$/,
      respondwith: './work_help.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=work_help-more$/,
      respondwith: './work_help-more.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=work_help-refresh$/,
      respondwith: './work_help-refresh.json'
    }
  ]
};
