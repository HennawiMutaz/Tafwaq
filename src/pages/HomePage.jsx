import React from 'react'





function HomePage() {

  // async function handleSignup() {

  //   setLoading(true);
  //   try {
  //     await signup(emailRef.current.value, passwordRef.current.value);
  //   } catch (error) {
  //     console.log("Error");
  //   }
  //   setLoading(false);
  //   setSignedin(true);
  //   emailRef.current.value = "";
  //   passwordRef.current.value = "";
  // }






    return (
      <div className="homepage">
      
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      
      
    {/* NAVBAR */}
  <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#header">الصفحة الرئيسية</a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#about">حول فريقنا </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#">تواصل معنا</a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#">الخدمات</a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#">سياسة الخصوصية</a>
              </li>
          </ul>
      </div>
    </div>
    {/* LOGO */}
    <a class="navbar-brand" href="#"><img src="./images/logo.png" alt="logo" width="120"  /></a>
  </div>
</nav>
{/* END OF NAVBAR */}
      

      {/* Header */}
      <header id="header" className="header">
        <div className="header-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ">
                <div className="image-container">
                  <img className="img-fluid" src="./images/header-teamwork.svg" alt="alternative" />
                </div> {/* end of image-container */}
              </div> {/* end of col2 */}
              <div id="intro" className="col-lg-6">
                <div className="text-container">
                  <h1>منصة التعليم الإلكتروني الأردنية الرسمية</h1>
                  <p className="p-large">مجاني تمامًا ، أفضل المعلمين ، من الابتدائية إلى الثانوية
                  </p>
                  <a className="btn-solid-lg page-scroll" href="/login"> تسجيل الدخول</a>
                </div> {/* end of text-container */}
              </div> {/* end of col1 */}
            </div> {/* end of row */}
          </div> {/* end of container */}
        </div> {/* end of header-content */}
      </header> {/* end of header */}
      {/* end of header */}
      {/* Video */}
      <div className="basic-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>شاهد الفيديو</h2>
            </div> {/* end of col */}
          </div> {/* end of row */}
          <div className="row">
            <div className="col-lg-12">
              {/* Video Preview */}
              <div className="image-container">
                <div className="video-wrapper">
                  <a className="popup-youtube" href="https://www.youtube.com/watch?v=fLCjQJCekTs" data-effect="fadeIn">
                    <img className="img-fluid" src="images/video-frame.svg" alt="alternative" />
                    <span className="video-play-button">
                      <span />
                    </span>
                  </a>
                </div> {/* end of video-wrapper */}
              </div> {/* end of image-container */}
              {/* end of video preview */}
            </div> {/* end of col */}
          </div> {/* end of row */}
        </div> {/* end of container */}
      </div> {/* end of basic-3 */}
      {/* end of video */}
      {/* Customers */}
      <div className="slider-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h5>موثوق به من قبل</h5>
              <br />
              {/* Image Slider */}
              <div className="slider-container">
                <div className="swiper-container image-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="image-container">
                        <img className="img-responsive" src="images/school1.png" alt="alternative" height={133} width={188} />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="image-container">
                        <img className="img-responsive" src="images/school2.png" alt="alternative" height={133} />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="image-container">
                        <img className="img-responsive" src="images/school5.png" alt="alternative" height={133} width={188} />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="image-container">
                        <img className="img-responsive" src="images/school3.png" alt="alternative" height={133} />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="image-container">
                        <img className="img-responsive" src="images/school4.png" alt="alternative" height={143} width={188} />
                      </div>
                    </div>
                  </div> {/* end of swiper-wrapper */}
                </div> {/* end of swiper container */}
              </div> {/* end of slider-container */}
              {/* end of image slider */}
            </div> {/* end of col */}
          </div> {/* end of row */}
        </div> {/* end of container */}
      </div> {/* end of slider-1 */}
      {/* end of customers */}
      {/* Services */}
      <div id="services" className="cards-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>الخدمات الخاصة بتفوق</h2>
              <p className="p-heading p-large" />
            </div> {/* end of col */}
          </div> {/* end of row */}
          <div className="row">
            <div className="col-lg-12">
              {/* Card */}
              <div className="card">
                <img className="card-image" src="images/easy.png" alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">سهولة الاستخدام</h4>
                  <p>منصة تفوق تمتاز ببساطة التصميم وسهولة الاستخدام من قبل الجميع بغض النظر عن عمر المستخدم</p>
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img className="card-image" src="images/hd.png" alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">دروس عالية الوضوح</h4>
                  <p>نحن نقدم جميع الدروس عبر فيديو وصوت عالي الجودة لنجعل الطلاب يشعرون بالراحة أثناء العملية التعليمية</p>
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img className="card-image" src="images/teacher.png" alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">معلمون محترفون</h4>
                  <p>يقوم فريق المعلمين لدينا بالتدريس بأكثر الطرق فعالية لضمان تلقي المعلومات بشكل واضح و صحيح</p>
                </div>
              </div>
              {/* end of card */}
            </div> {/* end of col */}
          </div> {/* end of row */}
        </div> {/* end of container */}
      </div> {/* end of cards-1 */}
      {/* end of services */}
      {/* Testimonials */}
      <div className="slider-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="image-container">
                <img className="img-fluid" src="images/testimonials-2-men-talking.svg" alt="alternative" />
              </div> {/* end of image-container */}
            </div> {/* end of col */}
            <div className="col-lg-6">
              <h2>ملاحظات طلابنا</h2>
              {/* Card Slider */}
              <div className="slider-container">
                <div className="swiper-container card-slider">
                  <div className="swiper-wrapper">
                    {/* Slide */}
                    <div className="swiper-slide">
                      <div className="card">
                        <img className="card-image" src="images/testimonial-1.svg" alt="alternative" />
                        <div className="card-body">
                          <p className="testimonial-text">لقد انتهيت للتو من زيارتي الأولى وقد اندهشت جدًا من النتائج التي أراها في منصة تفوق في مجال التعليم.</p>
                          <p className="testimonial-author">رولا السعدي</p>
                        </div>
                      </div>
                    </div> {/* end of swiper-slide */}
                    {/* end of slide */}
                    {/* Slide */}
                    <div className="swiper-slide">
                      <div className="card">
                        <img className="card-image" src="images/testimonial-2.svg" alt="alternative" />
                        <div className="card-body">
                          <p className="testimonial-text">لقد أثبت تفوق دائمًا جدارته في وضع نفسه في المرتبة الأولى بين منصات التعليم الأخرى في الأردن</p>
                          <p className="testimonial-author">لارا أحمد</p>
                        </div>
                      </div>
                    </div> {/* end of swiper-slide */}
                    {/* end of slide */}
                    {/* Slide */}
                    <div className="swiper-slide">
                      <div className="card">
                        <img className="card-image" src="images/testimonial-3.svg" alt="alternative" />
                        <div className="card-body">
                          <p className="testimonial-text">أحببت خدماتهم وأذهلت كثيرًا بالدعم والنتائج التي أراها في منصة تفوق في مجال التعليم</p>
                          <p className="testimonial-author">علي إسماعيل</p>
                        </div>
                      </div>
                    </div> {/* end of swiper-slide */}
                    {/* end of slide */}
                  </div> {/* end of swiper-wrapper */}
                  {/* Add Arrows */}
                  <div className="swiper-button-next" />
                  <div className="swiper-button-prev" />
                  {/* end of add arrows */}
                </div> {/* end of swiper-container */}
              </div> {/* end of slider-container */}
              {/* end of card slider */}
            </div> {/* end of col */}
          </div> {/* end of row */}
        </div> {/* end of container */}
      </div> {/* end of slider-2 */}
      {/* end of testimonials */}
      {/* About */}
      <div id="about" className="basic-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>حول فريقنا</h2>
              <p className="p-heading p-large" />
            </div> {/* end of col */}
          </div> {/* end of row */}
          <div className="row">
            <div className="col-lg-12">
              {/* Team Member */}
              <div className="team-member">
                <div className="image-wrapper">
                  <img className="img-fluid" src="images/team-member-2.svg" alt="alternative" />
                </div> {/* end of image-wrapper */}
                <p className="p-large"><strong>Hanna Zabaneh</strong></p>
                <p className="job-title">Front-End</p>
              </div> {/* end of team-member */}
              {/* end of team member */}
              {/* Team Member */}
              <div className="team-member">
                <div className="image-wrapper">
                  <img className="img-fluid" src="images/team-member-2.svg" alt="alternative" />
                </div> {/* end of image wrapper */}
                <p className="p-large"><strong>Mutasem Asfour</strong></p>
                <p className="job-title">Back-End</p>
              </div> {/* end of team-member */}
              {/* end of team member */}
              {/* Team Member */}
              <div className="team-member">
                <div className="image-wrapper">
                  <img className="img-fluid" src="images/team-member-3.svg" alt="alternative" />
                </div> {/* end of image wrapper */}
                <p className="p-large"><strong>Farah Hmedan</strong></p>
                <p className="job-title">Front-End</p>
              </div> {/* end of team-member */}
              {/* end of team member */}
              {/* Team Member */}
              <div className="team-member">
                <div className="image-wrapper">
                  <img className="img-fluid" src="images/team-member-2.svg" alt="alternative" />
                </div> {/* end of image wrapper */}
                <p className="p-large"><strong>Mutaz Alhennawi</strong></p>
                <p className="job-title">Back-End</p>
              </div> {/* end of team-member */}
              {/* end of team member */}
            </div> {/* end of col */}
          </div> {/* end of row */}
        </div> {/* end of container */}
      </div> {/* end of basic-4 */}
      {/* end of about */}
      {/* Footer */}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-col">
                <h4>حول تفوق</h4>
                <p>نحن متحمسون لتقديم أفضل الخدمات التعليمية للمدارس الأردنية</p>
              </div>
            </div> {/* end of col */}
            <div className="col-md-4">
              <div className="footer-col middle">
                <h4>روابط مهمة</h4>
                <ul className="list-unstyled li-space-lg">
                  <li className="media">
                    <i className="fas fa-square" />
                    <div className="media-body">Our business partners <a className="turquoise" href="#your-link">moe.gov.jo</a></div>
                  </li>
                  <li className="media">
                    <i className="fas fa-square" />
                    <div className="media-body">Read our <a className="turquoise" href="terms-conditions.html">Terms &amp; Conditions</a>, <a className="turquoise" href="privacy-policy.html">Privacy Policy</a></div>
                  </li>
                </ul>
              </div>
            </div> {/* end of col */}
            <div className="col-md-4">
              <div className="footer-col last">
                <h4>تواصل معنا</h4>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-facebook-f fa-stack-1x" />
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-twitter fa-stack-1x" />
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-google-plus-g fa-stack-1x" />
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-instagram fa-stack-1x" />
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-linkedin-in fa-stack-1x" />
                  </a>
                </span>
              </div>
            </div> {/* end of col */}
          </div> {/* end of row */}
        </div> {/* end of container */}
      </div> {/* end of footer */}
      {/* end of footer */}
      {/* Copyright */}
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="p-small">Copyright © 2021 <a href="#">Tafawuq</a> - All rights reserved</p>
            </div> {/* end of col */}
          </div> {/* enf of row */}
        </div> {/* end of container */}
      </div> {/* end of copyright */}
      {/* end of copyright */}

    </div>
    
    

    
    
    );
}

export default HomePage;
