import React from 'react'
import {Step} from 'semantic-ui-react'
import {GPC} from "../../lib/gameplay-constants";

export const StepGameplay = (props) => {
    return (
        <Step.Group attached='top' unstackable>
            <Step
                active={props.currentStep === GPC.STEP_GAMEPLAY.TEAM_UP}
                icon='users'
                link
                onClick={(event)=> props.onChange(GPC.STEP_GAMEPLAY.TEAM_UP, event)}
                title={GPC.STEP_GAMEPLAY.TEAM_UP}
                description='Select players'
            />
            <Step
                active={props.currentStep === GPC.STEP_GAMEPLAY.GAMEPLAY}
                icon='table'
                link
                onClick={(event) => props.onChange(GPC.STEP_GAMEPLAY.GAMEPLAY, event)}
                title={GPC.STEP_GAMEPLAY.GAMEPLAY}
                description='Enter points in match'
            />
        </Step.Group>
    )
};
