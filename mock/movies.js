(req, res, mock) => {
  var data = {
    count: req.query.count,
    start: req.query.start,
    total: 93
  }
  data['subjects|' + (req.query.start >= 90 ? '3' : '10')] = [{
    'rating': {
      'average': /[4-9]\.\d/,
    },
    'title': () => (mock.Random.ctitle()),
    'year|1901-2018': 2000,
  }]
  return mock.mock(data)
}