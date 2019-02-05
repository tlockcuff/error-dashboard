import React from 'react'
import styled from 'styled-components';
import { ua } from '../../utils/common'

const UserAgentStyled = styled.div`
    display:flex;
    > div {
        margin-right: 3rem;
    }
`
const AgentItem = styled.div`
    text-align:center;
    display:flex;
    align-items:center;
`

export default function UserAgent({ agent, prop }) {
    if (!agent) return '';
    const parsed = ua(agent);
    if (!prop) return (
        <UserAgentStyled>
            <AgentItem>
                <div>{getFamilyImage(parsed.family)}</div>
                <div className="ml-2 text-left"><h5 className="m-0">{parsed.family}</h5><small className="text-muted">Version: {getVersion(parsed)}</small></div>
            </AgentItem>
            <AgentItem>
                <div>{getFamilyImage(parsed.os.family)}</div>
                <div className="ml-2 text-left"><h5 className="m-0">{parsed.os.family}</h5><small className="text-muted">Version: {getVersion(parsed.os)}</small></div>
            </AgentItem>
        </UserAgentStyled>
    );
    switch (prop) {
        case 'family': return parsed[prop];
        case 'version': return getVersion(parsed);
        case 'os': return parsed.os.family;
        case 'osVersion': return getVersion(parsed.os);
        case 'device': return parsed[prop];
    }
}

function getVersion(agent) {
    return `${agent.major}.${agent.minor}.${agent.patch}`;
}

function getFamilyImage(name) {
    return <img src={`/images/${name.toLowerCase()}.png`} height="50"></img>
}
