import React from 'react'

function Card(props) {
    return (
        <a href={props.href}>
            <div className="container mb-4">
                <section className="cards">
                    <article className="card shadow p-3 mb-5 rounded border border-light border-5  ">
                        <div className="row">
                            <div className="col-6 col-lg-6 col-md-12 col-sm-12"><img className="card-img" src={props.src} alt="#" /></div>
                            <div className="col-6 col-lg-6 col-md-12 col-sm-12">
                                <h1>{props.subjectName}</h1>
                                <h6>{props.topic}</h6>
                                <h6 className="card-des">
                                    {props.desc}
                                </h6>
                                <h6 className="text-muted">{props.date}</h6>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </a>
    )
}

export default Card
