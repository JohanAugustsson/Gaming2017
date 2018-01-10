import React, { Component } from 'react'
import { Step } from 'semantic-ui-react'

export default class StepGameplay extends Component {
    state = {};

    handleClick = (e, { title }) => this.setState({ active: title })

    render() {
        const { active } = this.state;

        return (
            <Step.Group>
                <Step
                    active={active === 'Team up'}
                    icon='users'
                    link
                    onClick={this.handleClick}
                    title='Team up'
                    description='Select players'
                />
                <Step
                    active={active === 'Gameplay'}
                    icon='table'
                    link
                    onClick={this.handleClick}
                    title='Gameplay'
                    description='Set your scores'
                />
            </Step.Group>
        )
    }
}