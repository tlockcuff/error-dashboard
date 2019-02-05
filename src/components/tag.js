import React, { Component } from 'react'
import styled from 'styled-components';

const TagStyled = styled.div`
    display:flex;
    border:1px solid #ddd;
    border-radius:5px;
    line-height:1;
    `
    const TagPrefix = styled.div`
    border-right:1px solid #ddd;
    padding: 6px;
    font-size:14px;
    `
    const TagText = styled.div`
    padding: 6px 15px;
    font-family: monospace;
    line-height:1.1;
    font-size:14px;
    `
    
const TagListStyled = styled.div`
    display:flex;
    flex-wrap: wrap;
    > div {
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
`

class Tag extends Component {
  render() {
    return (
      <TagStyled>
          <TagPrefix className="text-muted">{this.props.prefix}</TagPrefix>
          <TagText className="text-primary">{this.props.linkable ? <a href={this.props.text} target="_blank">{this.props.text}</a> : this.props.text}</TagText>
      </TagStyled>
    )
  }
}

class TagList extends Component {
  render() {
    return (
      <TagListStyled>
          {this.props.children}
      </TagListStyled>
    )
  }
}

export {
    Tag,
    TagList
}
