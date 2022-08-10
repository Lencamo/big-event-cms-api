const articleCaseModel = {
  selectAllCase:
    'select * from ev_article_cate where is_delete=0 order by id asc'
}

module.exports = articleCaseModel
