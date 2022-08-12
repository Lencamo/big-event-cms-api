const articleModel = {
  insertArticle: 'insert into ev_articles set ?',
  countAll: 'SELECT COUNT(*) AS total FROM ev_articles',
  selectList:
    'SELECT arl.id, arl.title, arl.pub_date, arl.state, arc.cate_name FROM ev_articles AS arl,ev_article_cate AS arc  WHERE arl.cate_id = arc.id LIMIT ?, ?',
  // 解决total的return问题
  selectListPro:
    'SELECT arl.id, arl.title, arl.pub_date, arl.state, arc.cate_name,(SELECT COUNT(*) FROM ev_articles) AS total FROM ev_articles AS arl,ev_article_cate AS arc  WHERE arl.cate_id = arc.id LIMIT ?, ?',
  selectArtById:
    'SELECT arl.id, arl.title, arl.content, arl.cover_img, arl.pub_date, arl.state, arl.cate_id, arl.author_id, arc.cate_name, ev_users.username, ev_users.nickname FROM ev_articles AS arl, ev_article_cate AS arc, ev_users WHERE arl.cate_id = arc.id and arl.author_id = ev_users.id and arl.id = ?',
  delArticle: 'update ev_articles set is_delete=1 where id=?'
}

module.exports = articleModel
