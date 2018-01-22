import React from "react";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown/Dropdown";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";
import Form from "semantic-ui-react/dist/es/collections/Form/Form";

export const CreateMatch = (props) => {

    return (
        <div>
            <Form onSubmit={(event => props.newGame())}>
                <Form.Dropdown placeholder='Typ' onChange={(event, data) => props.onChangeGameType(data)} search selection options={props.gametypes}/>
                <Form.Dropdown placeholder='Serie' onChange={(event, data) => props.onChangeSerie(data)}  search selection options={props.serie}/>
                <Form.Button content="New Game"/>
            </Form>
        </div>
    )
};
