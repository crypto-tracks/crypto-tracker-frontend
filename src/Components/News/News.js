import React from 'react';
import { Table, Accordion } from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import './News.css';

TimeAgo.addDefaultLocale(en);
class News extends React.Component {
  render() {
    const timeAgo = new TimeAgo('en-US');
    let news = this.props.news.map((item) => (
      <tr key={item.id}>
        <td>{timeAgo.format(new Date(item.published), 'mini')}</td>
        <td>
          <a
            style={{ color: '#D1CDC7' }}
            href={item.link}
            target='_blank'
            rel='noreferrer'
          >
            {item.title}
          </a>
        </td>
      </tr>
    ));
    return (
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as="h2" variant="link" eventKey="0">
          News
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th style={{textAlign: 'center'}}>Title</th>
              </tr>
            </thead>
            <tbody>{news}</tbody>
          </Table>
        </Accordion.Collapse>
      </Accordion>
    );
  }
}

export default News;
