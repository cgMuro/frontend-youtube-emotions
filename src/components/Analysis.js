import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Col, Row, Collapse } from 'reactstrap'
import { ApiContext } from '../context/ApiState';
import { VideoContext } from '../context/VideoState';

export default function Analysis() {

    
    const history = useHistory();

    const { videoURL } = useContext(VideoContext)
    const { predictions } = useContext(ApiContext)
    
    useEffect(() => {
        console.log(videoURL)
        if (videoURL === '' ) {
            history.push('/');
        }
    }, [])

    const [isOpenPositive, setIsOpenPositive] = useState(false);
    const [isOpenNegative, setIsOpenNegative] = useState(false);
    const [isOpenNeutral, setIsOpenNeutral] = useState(false);


    return (
        <Container className="d-flex align-items-center justify-content-center flex-column" id="analysis-container">
            <Row>
                <Col className="p-0">
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoURL.split(/(v=)/g)[2]}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Col>
                <Col className="p-0">

                    <Container fluid className="d-flex flex-column">
                        <Container fluid className="toggle-container p-0">
                            <Container fluid onClick={() => {
                                setIsOpenPositive(prevState => !prevState);
                                setIsOpenNegative(false);
                                setIsOpenNeutral(false);
                            }}
                                className="d-flex flex-row align-items-center"
                            >
                                <p className="mb-0">Positive</p>
                                <i className={`ml-auto fa fa-arrow-down ${isOpenPositive ? 'rotate-arrow-collapse' : null}`}></i>
                            </Container>
                            <Collapse isOpen={isOpenPositive}>
                                <Container className="comments-container my-3">
                                    {
                                        predictions.data.map(block => {
                                            if (block.prediction === 'positive') {
                                                return (
                                                    <div>
                                                        <p><a href={block.author_channel_url}><b>{block.author}</b></a></p>
                                                        <p>{block.comment}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </Container>
                            </Collapse>
                        </Container>

                        <Container fluid className="toggle-container p-0">
                            <Container fluid
                                onClick={() => {
                                    setIsOpenPositive(false);
                                    setIsOpenNegative(prevState => !prevState);
                                    setIsOpenNeutral(false);
                                }}
                                className="d-flex flex-row align-items-center"
                            >
                                <p className="mb-0">Negative</p>
                                <i className={`ml-auto fa fa-arrow-down ${isOpenNegative ? 'rotate-arrow-collapse' : null}`}></i>
                            </Container>
                            <Collapse isOpen={isOpenNegative}>
                                <Container className="comments-container my-3">
                                    {
                                        predictions.data.map(block => {
                                            if (block.prediction === 'negative') {
                                                return (
                                                    <div>
                                                        <p><a href={block.author_channel_url}><b>{block.author}</b></a></p>
                                                        <p>{block.comment}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </Container>
                            </Collapse>
                        </Container>

                        <Container fluid className="toggle-container p-0">
                            <Container fluid
                                onClick={() => {
                                    setIsOpenPositive(false);
                                    setIsOpenNegative(false);
                                    setIsOpenNeutral(prevState => !prevState);
                                }}
                                className="d-flex flex-row align-items-center"
                            >
                                <p className="mb-0">Neutral/Other</p>
                                <i className={`ml-auto fa fa-arrow-down ${isOpenNeutral ? 'rotate-arrow-collapse' : null}`}></i>
                            </Container>
                            <Collapse isOpen={isOpenNeutral}>
                                <Container className="comments-container my-3">
                                    {
                                        predictions.data.map(block => {
                                            if (block.prediction === 'neutral/other') {
                                                return (
                                                    <div>
                                                        <p><a href={block.author_channel_url}><b>{block.author}</b></a></p>
                                                        <p>{block.comment}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </Container>
                            </Collapse>
                        </Container>
                    </Container>

                </Col>
            </Row>



        </Container>
    )
}
