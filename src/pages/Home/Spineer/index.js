import { Component } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./spiner.css";
import Avatar from "assets/images/actor.png";
class Spinner extends Component {
  state = {
    carouselDeg: 45,
    itemDeg: -45,
    centerItem: 0,
    prevItem: 3,
    lastItem: 3,
    nextItem: 1,
    carousel: [
      {
        img: Avatar,
        id: 0,
        position: 1,
        Name: "Bilal Hassan",
        text: "Exceptional care and professionalism! My experience with MediTour Healthcare was outstanding. The staff were attentive, the facilities were top-notch, and I received effective treatment that exceeded my expectations",
        Location: "Islamabad, Pakistan",
      },
      {
        img: Avatar,
        id: 1,
        position: 2,
        text: "Highly recommended! I chose MediTour Healthcare for a medical procedure, and I'm glad I did. The team was knowledgeable, caring, and the entire process was smooth and efficient. Five stars!",
        Name: "Abdullah Khan",
        Location: "Lahore, Pakistan",
      },
      {
        img: Avatar,
        id: 2,
        position: 3,
        text: "Impressed by the quality of service! MediTour Healthcare goes above and beyond to ensure patient satisfaction. From the moment I walked in, I felt well taken care of. A trustworthy healthcare provider indeed",
        Name: "Bilal Azam",
        Location: "Quetta, Pakistan",
      },
      {
        img: Avatar,
        id: 3,
        position: 4,
        text: "A reliable healthcare partner! MediTour Healthcare has been my go-to for medical consultations and treatments. Their expertise, combined with their friendly approach, makes them stand out in the healthcare industry. I wouldn't hesitate to recommend them to others.",
        Name: "Noman Ahamd",
        Location: "Peshawar, Pakistan",
      },
    ],
  };

  getIdItems = (side) => {
    const { nextItem, prevItem } = this.state;

    if (side) {
      this.setState(
        {
          centerItem: nextItem,
        },
        () => this.prevNext(this.state.centerItem)
      );
    } else {
      this.setState(
        {
          centerItem: prevItem,
        },
        () => this.prevNext(this.state.centerItem)
      );
    }
  };

  prevNext = (itemId) => {
    if (itemId === this.state.lastItem) {
      this.setState({
        nextItem: 0,
        prevItem: this.state.lastItem - 1,
      });
    } else if (itemId === 0) {
      this.setState({
        prevItem: this.state.lastItem,
        nextItem: 1,
      });
    } else {
      this.setState((state) => ({
        nextItem: state.centerItem + 1,
        prevItem: state.centerItem - 1,
      }));
    }
  };

  next = () => {
    this.getIdItems(true);
    this.setState((state) => ({
      carouselDeg: state.carouselDeg - 90,
      itemDeg: state.itemDeg + 90,
    }));
  };

  prev = () => {
    this.getIdItems(false);
    this.setState((state) => ({
      carouselDeg: state.carouselDeg + 90,
      itemDeg: state.itemDeg - 90,
    }));
  };

  getCssClass = (id) => {
    const { centerItem, nextItem, prevItem } = this.state;

    if (id === centerItem) {
      return "active";
    } else if (id === nextItem) {
      return "next";
    } else if (id === prevItem) {
      return "prev";
    }
  };

  getDynamicImage = () => {
    const { carousel, centerItem } = this.state;
    return carousel.find((item) => item.id === centerItem)?.img || CCC;
  };

  render() {
    return (
      <div className="flx bgcolor">
        <div className="w2-45  ">
          <p className="fs32 semiBold">
            <span style={{ marginRight: "4px", color: "#0e54a3" }}>
              Top Clients,{" "}
            </span>
            <span className="colororange">Say About Us</span>
          </p>
          {this.state.carousel[this.state.centerItem] && (
            <p className="texxts">
              {this.state.carousel[this.state.centerItem].text}
            </p>
          )}
          <div className="name-outer">
            <div>
              {this.state.carousel[this.state.centerItem] && (
                <p className="only-names">
                  {this.state.carousel[this.state.centerItem].Name}
                </p>
              )}
              {this.state.carousel[this.state.centerItem] && (
                <p className="Location">
                  {this.state.carousel[this.state.centerItem].Location}
                </p>
              )}
            </div>
            <div className="simple-flx">
              <FaChevronLeft className="lefticon" onClick={this.next} />
              <FaChevronRight className="lefticon" onClick={this.prev} />
            </div>
          </div>
        </div>{" "}
        <div className="w-45 mtsm50">
          <div className="App">
            <div className="test" />
            <div
              className="carousel"
              style={{ transform: `rotate(${this.state.carouselDeg}deg)` }}
            >
              {this.state.carousel.map((item, index) => (
                <div
                  className={`item-carousel ${this.getCssClass(index)}`}
                  key={item.id}
                  id={item.id}
                  style={{ transform: `rotate(${this.state.itemDeg}deg)` }}
                >
                  <img
                    alt={`carousel ${index + 1}`}
                    src={item.img}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="posts-Outer ">
              <div className="postsss">
                <img
                  src={this.getDynamicImage()}
                  className="mmmm"
                  alt="Dynamic Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;
