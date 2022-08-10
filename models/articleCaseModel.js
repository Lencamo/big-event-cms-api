const articleCaseModel = {
  selectAllCase:
    'select * from ev_article_cate where is_delete=0 order by id asc',
  selectCheck:
    'select * from ev_article_cate where cate_name=? or cate_alias=?',
  addCase: 'insert into ev_article_cate set ?',
  delCase: 'update ev_article_cate set is_delete=1 where id=?',
  checkById: 'select * from ev_article_cate where id=?'
}

module.exports = articleCaseModel
