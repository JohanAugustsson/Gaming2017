import React from "react";
import Form from "semantic-ui-react/dist/es/collections/Form/Form";

export const CreateMatch = (props) => {

    return (
        <div>
            <Form onSubmit={(event => props.createMatch())}>
                <label>Typ</label>
                <Form.Dropdown name="type" placeholder='Select type of game'
                               onChange={(event, data) => props.onChangeGameType(data)} basic
                               options={props.gametypes}/>
                <br />
                <label>League</label>
                <Form.Dropdown placeholder='Select league' value={props.currentVal}
                               onChange={(event, data) => props.onChangeSerie(data)} basic options={props.serie}/>
                <br/>
                <Form.Button inverted content="New Game"/>
            </Form>
        </div>
    )
};
