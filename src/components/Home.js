import React, { useContext, useState } from 'react';
import { Container, Form, Input, FormGroup, Button, Alert, Label } from 'reactstrap';
import { ApiContext } from '../context/ApiState';
import { ErrorContext } from '../context/ErrorState';
import { VideoContext } from '../context/VideoState';
import { useHistory } from 'react-router-dom';

import Loading from './Loading';

export default function Home() {

    const history = useHistory();

    const { videoURL, setVideoURL } = useContext(VideoContext);
    const { predictions, getPredictions, loading } = useContext(ApiContext);
    const { error } = useContext(ErrorContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await getPredictions(videoURL, selectNumberComments, selectOrderComments);

        if (res) {
            history.push('/predictions');
        }
    }

    // Alert block functions
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    //

    const [selectNumberComments, setSelectNumberComments] = useState(20);
    const [selectOrderComments, setSelectOrderComments] = useState('relevance');

    return (
        <>
            {
                loading
                    ?
                    <Loading />
                    :
                    <Container className="d-flex align-items-center justify-content-center flex-column" id="search-container">
                        {
                            error.msg !== null
                                ?
                                <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                                    {error.msg}
                                </Alert>
                                : null
                        }
                        <h3 className="mb-4">Analyze Comments</h3>
                        <Form id="search-form" onSubmit={(e) => handleSubmit(e)} className="mt-3">
                            <FormGroup>
                                <Label for="videoURL-input"><b>Video URL</b></Label>
                                <Input
                                    id="videoURL-input"
                                    type="text"
                                    value={videoURL}
                                    onChange={(e) => setVideoURL(e.target.value)}
                                    placeholder="Paste the video URL"
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="select-comments-number"><b>Choose number of comments to analyze</b></Label>
                                <Input type="select" name="select" id="select-comments-number" value={selectNumberComments} onChange={(e) => setSelectNumberComments(e.target.value)}>
                                    <option value="20">20</option>
                                    <option value="40">40</option>
                                    <option value="60">60</option>
                                    <option value="80">80</option>
                                    <option value="100">100</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="select-comments-number"><b>Choose order of comments to analyze</b></Label>
                                <Input type="select" name="select" id="select-comments-number" value={selectOrderComments} onChange={(e) => setSelectOrderComments(e.target.value)}>
                                    <option value="relevance">relevance</option>
                                    <option value="time">time</option>
                                </Input>
                            </FormGroup>
                            <Button block outline color="dark" className="text-center">Analyze Video</Button>
                        </Form>

                    </Container >
            }
        </>
    )
}
