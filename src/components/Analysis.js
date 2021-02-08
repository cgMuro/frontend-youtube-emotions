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

    const fetchPredictions = async () => {
        const id = history.location.pathname.split('/')[2];
        // Reset videoURL because it's lost when reload
        setVideoURL(`https://www.youtube.com/watch?v=${id}`);
        const nComments = history.location.search.split('&')[0].split('=')[1];
        const orderComments = history.location.search.split('&')[1].split('=')[1];

        const res = await getPredictions(id, nComments, orderComments);
        return res;
    }

    const [isOpenPositive, setIsOpenPositive] = useState(false);
    const [isOpenNegative, setIsOpenNegative] = useState(false);
    const [isOpenNeutral, setIsOpenNeutral] = useState(false);
    const [isOpenFeedback, setIsOpenFeedback] = useState(false);
    const [isOpenSadness, setIsOpenSadness] = useState(false);

    const [counter, setCounter] = useState({
        positive: 0,
        negative: 0,
        neutral: 0,
        feedback: 0,
        sadness: 0,
    })

    // Count the number of positive, negative and neutral comments
    const counterFunction = () => {
        predictions.data.map(block => {
            if (block.prediction === 'positive') {
                setCounter(prevState => ({
                    ...prevState,
                    positive: prevState.positive + 1
                }))
            } else if (block.prediction === 'negative') {
                setCounter(prevState => ({
                    ...prevState,
                    negative: prevState.negative + 1
                }))
            } else if (block.prediction === 'neutral/other') {
                setCounter(prevState => ({
                    ...prevState,
                    neutral: prevState.neutral + 1
                }))
            } else if (block.prediction === 'constructive feedback/idea') {
                setCounter(prevState => ({
                    ...prevState,
                    feedback: prevState.feedback + 1
                }))
            } else if (block.prediction === 'sadness') {
                setCounter(prevState => ({
                    ...prevState,
                    sadness: prevState.sadness + 1
                }))
            }
            return null;
        })
    }
    // Update counter when predictions come
    useEffect(() => {
        setCounter({ positive: 0, negative: 0, neutral: 0, feedback: 0, sadness: 0 });
        counterFunction();
    }, [predictions])

    useEffect(async () => {
        const res = await fetchPredictions();
        // Return to home is something went wrong
        if (!res) {
            history.push('/');
        }
    }, [])


    return (
        <>
            {
                loading
                    ?
                    <Loading />
                    :
                    <Container className="d-flex align-items-center justify-content-center flex-column" id="analysis-container">
                        <Container fluid className="d-flex justify-content-center mt-5 pt-5">
                            <iframe title="youtube-video" width="560" height="315" src={`https://www.youtube.com/embed/${videoURL.split(/(v=)/g)[2]}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </Container>

                        <Container fluid className="d-flex flex-column px-md-5 m-5">
                            {/* POSITIVE */}
                            <Container fluid className="toggle-container p-0">
                                <Container fluid onClick={() => {
                                    setIsOpenPositive(prevState => !prevState);
                                    setIsOpenNegative(false);
                                    setIsOpenNeutral(false);
                                    setIsOpenFeedback(false);
                                    setIsOpenSadness(false);
                                }}
                                    className="d-flex flex-row align-items-center pl-3"
                                >
                                    <div className="counter-container" style={{ backgroundColor: 'rgba(0, 255, 0, 0.7)' }}>{counter.positive}</div><p className="mb-0"><span className="mr-2">😀</span>Positive (joy/happiness/amusement/love)</p>
                                    <i className={`ml-auto fa fa-arrow-down ${isOpenPositive ? 'rotate-arrow-collapse' : null}`}></i>
                                </Container>
                                <Collapse isOpen={isOpenPositive}>
                                    <Container className="comments-container mb-3">
                                        {
                                            predictions.data.map(block => {
                                                if (block.prediction === 'positive') {
                                                    return (
                                                        <Row className="my-3">
                                                            <Col md={1}>
                                                                <img
                                                                    className="img-fluid avatar"
                                                                    src={block.author_profile_pic_url} 
                                                                    alt={`${block.author}-profile_pic`}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <p><a href={block.author_channel_url} target="_blank" rel="noreferrer"><b>{block.author}</b></a></p>
                                                                <p style={{ cursor: 'text' }}>{block.comment}</p>
                                                            </Col>
                                                        </Row>
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
                                        setIsOpenFeedback(false);
                                        setIsOpenSadness(false);
                                    }}
                                    className="d-flex flex-row align-items-center pl-3"
                                >
                                    <div className="counter-container" style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)' }}>{counter.negative}</div><p className="mb-0"><span className="mr-2">🤬</span>Negative (anger/hate/disgust)</p>
                                    <i className={`ml-auto fa fa-arrow-down ${isOpenNegative ? 'rotate-arrow-collapse' : null}`}></i>
                                </Container>
                                <Collapse isOpen={isOpenNegative}>
                                    <Container className="comments-container mb-3">
                                        {
                                            predictions.data.map(block => {
                                                if (block.prediction === 'negative') {
                                                    return (
                                                        <Row className="my-3">
                                                            <Col md={1}>
                                                                <img
                                                                    className="img-fluid avatar"
                                                                    src={block.author_profile_pic_url} 
                                                                    alt={`${block.author}-profile_pic`}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <p><a href={block.author_channel_url} target="_blank" rel="noreferrer"><b>{block.author}</b></a></p>
                                                                <p>{block.comment}</p>
                                                            </Col>
                                                        </Row>
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
                                        setIsOpenFeedback(false);
                                        setIsOpenSadness(false);
                                    }}
                                    className="d-flex flex-row align-items-center pl-3"
                                >
                                    <div className="counter-container" style={{ backgroundColor: 'rgba(169, 169, 169, 0.7)' }}>{counter.neutral}</div><p className="mb-0"><span className="mr-2">😶</span>Neutral/Other</p>
                                    <i className={`ml-auto fa fa-arrow-down ${isOpenNeutral ? 'rotate-arrow-collapse' : null}`}></i>
                                </Container>
                                <Collapse isOpen={isOpenNeutral}>
                                    <Container className="comments-container mb-3">
                                        {
                                            predictions.data.map(block => {
                                                if (block.prediction === 'neutral/other') {
                                                    return (
                                                        <Row className="my-3">
                                                            <Col md={1}>
                                                                <img
                                                                    className="img-fluid avatar"
                                                                    src={block.author_profile_pic_url} 
                                                                    alt={`${block.author}-profile_pic`}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <p><a href={block.author_channel_url} target="_blank" rel="noreferrer"><b>{block.author}</b></a></p>
                                                                <p>{block.comment}</p>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })
                                        }
                                    </Container>
                                </Collapse>
                            </Container>

                            {/* CONSTRUCTIVE FEEDBACK/IDEA */}
                            <Container fluid className="toggle-container p-0">
                                <Container fluid
                                    onClick={() => {
                                        setIsOpenPositive(false);
                                        setIsOpenNegative(false);
                                        setIsOpenNeutral(false);
                                        setIsOpenFeedback(prevState => !prevState);
                                        setIsOpenSadness(false);
                                    }}
                                    className="d-flex flex-row align-items-center pl-3"
                                >
                                    <div className="counter-container" style={{ backgroundColor: 'rgba(242, 156, 43, 0.7)' }}>{counter.feedback}</div><p className="mb-0"><span className="mr-2">💡</span>Constructive Feedback/Idea</p>
                                    <i className={`ml-auto fa fa-arrow-down ${isOpenFeedback ? 'rotate-arrow-collapse' : null}`}></i>
                                </Container>
                                <Collapse isOpen={isOpenFeedback}>
                                    <Container className="comments-container mb-3">
                                        {
                                            predictions.data.map(block => {
                                                if (block.prediction === 'constructive feedback/idea') {
                                                    return (
                                                        <Row className="my-3">
                                                            <Col md={1}>
                                                                <img
                                                                    className="img-fluid avatar"
                                                                    src={block.author_profile_pic_url} 
                                                                    alt={`${block.author}-profile_pic`}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <p><a href={block.author_channel_url} target="_blank" rel="noreferrer"><b>{block.author}</b></a></p>
                                                                <p>{block.comment}</p>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })
                                        }
                                    </Container>
                                </Collapse>
                            </Container>

                            {/* SADNESS */}
                            <Container fluid className="toggle-container p-0">
                                <Container fluid
                                    onClick={() => {
                                        setIsOpenPositive(false);
                                        setIsOpenNegative(false);
                                        setIsOpenNeutral(false);
                                        setIsOpenFeedback(false);
                                        setIsOpenSadness(prevState => !prevState);
                                    }}
                                    className="d-flex flex-row align-items-center pl-3"
                                >
                                    <div className="counter-container" style={{ backgroundColor: 'rgba(51, 51, 255, 0.7)' }}>{counter.sadness}</div><p className="mb-0"><span className="mr-2">😭</span>Sadness</p>
                                    <i className={`ml-auto fa fa-arrow-down ${isOpenSadness ? 'rotate-arrow-collapse' : null}`}></i>
                                </Container>
                                <Collapse isOpen={isOpenSadness}>
                                    <Container className="comments-container mb-3">
                                        {
                                            predictions.data.map(block => {
                                                if (block.prediction === 'sadness') {
                                                    return (
                                                        <Row className="my-3">
                                                            <Col md={1}>
                                                                <img
                                                                    className="img-fluid avatar"
                                                                    src={block.author_profile_pic_url} 
                                                                    alt={`${block.author}-profile_pic`}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <p><a href={block.author_channel_url} target="_blank" rel="noreferrer"><b>{block.author}</b></a></p>
                                                                <p>{block.comment}</p>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })
                                        }
                                    </Container>
                                </Collapse>
                            </Container>

                        </Container>

                    </Container>
            }
        </>
    )
}
