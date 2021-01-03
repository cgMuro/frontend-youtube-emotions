import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Col, Row, Collapse } from 'reactstrap'
import { ApiContext } from '../context/ApiState';
import { VideoContext } from '../context/VideoState';
import Loading from './Loading';

export default function Analysis() {

    
    const history = useHistory();

    const { videoURL, setVideoURL } = useContext(VideoContext);
    const { predictions, getPredictions, loading } = useContext(ApiContext);
    
    const fetchPredictions = async() => {
        const id = history.location.pathname.split('/')[2];
        // Reset videoURL because it's lost when reload
        setVideoURL(`https://www.youtube.com/watch?v=${id}`);
        const nComments = history.location.search.split('&')[0].split('=')[2];
        const orderComments = history.location.search.split('&')[1].split('=')[2];

        const res = await getPredictions(id, nComments, orderComments);
        return res;
    }

    useEffect(async() => {
        const res = await fetchPredictions();

        if (!res) {
            history.push('/');
        }
    }, [])
        

    const [isOpenPositive, setIsOpenPositive] = useState(false);
    const [isOpenNegative, setIsOpenNegative] = useState(false);
    const [isOpenNeutral, setIsOpenNeutral] = useState(false);

    return (
        <>
            {
                loading
                ?
                    <Loading />
                :
                    <Container className="d-flex align-items-center justify-content-center flex-column" id="analysis-container">
                        <Row>
                            <Col className="p-0 my-auto">
                                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoURL.split(/(v=)/g)[2]}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </Col>
                            <Col className="p-0">
            
                                <Container fluid className="d-flex flex-column">
            
                                    {/* POSITIVE */}
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
            
                                    {/* NEGATIVE */}
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
            
                                    {/* NEUTRAL/OTHER */}
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
            }
        </>
    )
}
