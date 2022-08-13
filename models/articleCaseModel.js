const articleCaseModel = {
  selectAllCase:
    'select * from ev_article_cate where is_delete=0 order by id asc',
  selectCheck:
    'select * from ev_article_cate where cate_name=? or cate_alias=?',
  // checkIs_Delete:
  // 'select * from ev_article_cate where is_delete=1 and cate_name=? and cate_alias=?',
  addCase: 'insert into ev_article_cate set ?',
  addCasePro:
  'update ev_article_cate set is_delete=0 where cate_name=? and cate_alias=?',
  delCase: 'update ev_article_cate set is_delete=1 where id=?',
  checkById: 'select * from ev_article_cate where id=?',
  selectById: 'select * from ev_article_cate where id=?',
  selectCheckAll:
    'select * from ev_article_cate where id<>? and (cate_name=? or cate_alias=?)', // 重点理解🍗这条SQL语句
  updateCase: 'update ev_article_cate set ? where id=?'
}

module.exports = articleCaseModel
