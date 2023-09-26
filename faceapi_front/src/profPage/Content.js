import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import UseFetch from './Usefetch'
import * as faceapi from 'face-api.js';
import * as canvas from 'canvas';
import Img4 from './video-call.png'
import Img5 from './no-video.png'
import Img8 from './people-1.png'
import Img9 from './people-2.png'
import Img10 from './people-3.png'
import Img11 from './people-4.png'


function Content() {
    const { id } = useParams();
    const VidRef = useRef(null)
    const canvasRef = useRef(null)
    const [Img_valid, setImg_valid] = useState()
    const [ImgPre1, setImgPre1] = useState([])
    const history = useNavigate();
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    const [Abs_std, setAbs_std] = useState([])
    const { data: Students } = UseFetch("http://127.0.0.1:8000/api/student/list?id_ses=" + id, config)
    const [std, setstd] = useState("")

    // let video = VidRef.current
    // alert(id)
    const startVid = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then(stream => {
                // setsrc(null)
                window.localStream = stream;
                VidRef.current.srcObject = stream;


            })

    }

    useEffect(() => {
        if (!localStorage.getItem('token'))
            history("/");

        Students && setAbs_std(Students.list_student)
        const video1 = document.getElementById('video')
        document.getElementById("header").style.height = 100 + '%';

        const loadModels = () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models'),
                faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
            ]).then(res => {
                console.log('its done')
            })
                .catch((err) => {
                    console.log(err);
                });

        }
        VidRef.current && loadModels();



        function loadLabeledImages() {

            const labels = Students.list_student;
            // const labels = [
            //     {
            //         name: 'Issam',
            //         key: '6sQdYgG'
            //     },
            //     {
            //         name: 'Mohmed',
            //         key: 'qnVkygV'
            //     }
            // ]
            // console.log(Students)
            return Promise.all(
                // Students.list_student.map(async label => {
                labels.map(async label => {
                    const descriptions = []

                    // "https://i.ibb.co/bJ1p3rM/Issam.jpg"
                    // "https://i.ibb.co/8Y1xC6H/Mohmed.jpg"

                    // const path = `http://127.0.0.1:8000/images/${label.image}`;
                    // const canvas = require("canvas");
                    // const { Image, Canvas, ImageData } = canvas;
                    // const img = await canvas.loadImage(`http://127.0.0.1:8000/images/${label.image}`);
                    // faceapi.env.monkeyPatch({ Image, Canvas, ImageData });
                    // const img = await faceapi.bufferToImage(`http://127.0.0.1:8000/images/${label.image}`)

                    // const detections = await faceapi.detectSingleFace(img);
                    const img = await faceapi.fetchImage(`https://i.ibb.co/${label.image}/${label.first_name}-${label.last_name}.jpg`)
                    // if (label.first_name == "Tom") {
                    //     const img = await faceapi.fetchImage(`http://127.0.0.1:8000/${label.image}`)
                    // }


                    // console.log(img)
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                    descriptions.push(detections.descriptor)

                    // console.log(detections)


                    return {
                        face: new faceapi.LabeledFaceDescriptors(label.first_name + '-' + label.last_name, descriptions),
                        key: label.image
                    }
                })
            )
        }
        VidRef.current.addEventListener("play", async () => {

            const D_Size = {
                width: VidRef.current.width,
                height: VidRef.current.height
            }

            const a = await loadLabeledImages()
            let labeledFaceDescriptors = []
            a.forEach(a => { labeledFaceDescriptors.push(a.face) })
            // console.log(labeledFaceDescriptors)
            // console.log("=======", a)
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
            setInterval(async () => {
                // console.log(faceMatcher);
                const detection = await faceapi.detectAllFaces(VidRef.current, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks().withFaceExpressions().withFaceDescriptors();
                canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(VidRef.current)
                faceapi.matchDimensions(canvasRef.current, D_Size)
                const resizedDetections = faceapi.resizeResults(detection, D_Size)
                canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

                results.forEach((result, i) => {


                    let j = 0;
                    a.forEach(a => {
                        j++;

                        if (a.face.label == result._label && j == 1) {

                            setstd(result._label);
                            setImg_valid(a)


                        }
                        if (std != result._label) {
                            j = 0;
                        }

                    })
                    const box = resizedDetections[i].detection.box
                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                    drawBox.draw(canvasRef.current)
                })
                // faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
                // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
                // faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
                // faceapi.draw.drawFace(canvasRef.current, resizedDetections)
                // console.log(detection)

            }, 10)
        });

        document.querySelector('.img1').onclick = function () {
            window.localStream.getVideoTracks()[0].stop();

            // video.src = '';

        };

    })

    ImgPre1.push(Img_valid)
    // console.log(ImgPre1)
    let not_dup_std = [];

    var seen = {};
    for (var i = 0; i < ImgPre1.length; i++) {
        if (ImgPre1[i]) {
            if (!(ImgPre1[i].key in seen)) {
                not_dup_std.push(ImgPre1[i]);
                seen[ImgPre1[i].key] = true;
                // seen[] = true;
            }

        }

    }
    ;


    Abs_std.map((x, i) => {
        if (not_dup_std.length > 0) {
            not_dup_std.map(y => {
                if (y.key == x.image) {
                    console.log(x, '---->', i)
                    console.log(Abs_std)
                    Abs_std.splice(i, 1);
                }
            })
        }
    }
    );


    return (
        <div className='container'>
            <div className="row">
                <div className="col-8">
                    <div className='user'>
                        <div className="div">
                            <video ref={VidRef} width={720} height={560} src='' id='video' muted autoPlay className='host_img'>
                            </video>
                            <canvas ref={canvasRef} width={720} height={560} ></canvas>
                        </div>
                        <div className="audio active">
                            <i class="far fa-microphone-slash"></i>
                        </div>
                    </div>
                    <div className="controls">
                        <img src={Img4} alt="" onClick={startVid} className='img' />
                        <img src={Img5} alt="" className='img1' />

                    </div>
                </div>
                <div className="col-4 layer">
                    <div className="joined">
                        <p>Students Joined</p>
                        <div>
                            {
                                not_dup_std.map((std, i, row) => {
                                    return <div className='user'>
                                        <img src={`https://i.ibb.co/${std.key}/${std.face.label}.png`} alt="" />
                                        <div class='status'>
                                        </div>
                                    </div>;

                                })
                            }

                        </div>
                    </div>
                    <div className="Absent">
                        <p>Absent students</p>
                        <div>
                            {
                                Abs_std.map(std => {

                                    return <div className='user'>
                                        <img key={std.student_id} src={`https://i.ibb.co/${std.image}/${std.first_name}-${std.last_name}.png`} alt="" />
                                    </div>;
                                })


                                // })
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Content
