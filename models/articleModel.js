const articleModel = {
  insertArticle: 'insert into ev_articles set ?',
  countAll: 'SELECT COUNT(*) AS total FROM ev_articles',
  selectList:
    'SELECT arl.id, arl.title, arl.pub_date, arl.state, arc.cate_name FROM ev_articles AS arl,ev_article_cate AS arc  WHERE arl.cate_id = arc.id LIMIT ?, ?',
  // 解决total的return问题
  selectListPro:
    'SELECT arl.id, arl.title, arl.pub_date, arl.state, arc.cate_name,(SELECT COUNT(*) FROM ev_articles) AS total FROM ev_articles AS arl,ev_article_cate AS arc  WHERE arl.cate_id = arc.id LIMIT ?, ?'
}

module.exports = articleModel
