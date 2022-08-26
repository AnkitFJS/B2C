import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPostsRequest,
  fetchRecentPostsRequest,
} from "../../redux/actions/blogActions";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import Post from "../../components/post/Post";
import FetchDataHandle from "../../components/other/FetchDataHandle";
import BlogSidebar from "../../components/blog/BlogSidebar";
import PartnerOne from "../../components/sections/partners/PartnerOne";

function blogGridSidebar() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const blogState = useSelector((state) => state.blogReducer);
  const { allPosts, recentPosts } = blogState;
  useEffect(() => {
    dispatch(fetchPostsRequest({ limit: 4, page: currentPage }));
    dispatch(fetchRecentPostsRequest({ limit: 4 }));
  }, [currentPage]);
  const onPaginationChange = (current) => {
    setCurrentPage(current);
  };
  return (
    <LayoutOne title="Blog grid with sidebar">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Blog</Breadcrumb.Item>
          <Breadcrumb.Item>Blog grid with sidebar</Breadcrumb.Item>
        </Breadcrumb>
        <div className="blog">
          <Row gutter={30}>
            <Col xs={24} lg={6}>
              <BlogSidebar recentPostsData={recentPosts} />
            </Col>
            <Col xs={24} lg={18}>
              <div className="blog-content">
                <FetchDataHandle
                  data={allPosts}
                  renderData={(data) => (
                    <Row gutter={15}>
                      {data.map((item, index) => (
                        <Col key={index} xs={24} sm={12}>
                          <Post data={item} />
                        </Col>
                      ))}
                    </Row>
                  )}
                />
              </div>
              <Pagination
                onChange={onPaginationChange}
                defaultCurrent={currentPage}
                pageSize={4}
                total={allPosts.count}
              />
            </Col>
          </Row>
        </div>
        <PartnerOne />
      </Container>
    </LayoutOne>
  );
}

export default React.memo(blogGridSidebar);
