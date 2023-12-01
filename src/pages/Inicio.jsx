import img1 from '../assets/serenos1.jpg'
import img2 from '../assets/serenos2.jpg'
import img3 from '../assets/serenos3.jpg'

export const Inicio = () => {
  return (
    <div className="image-inicio-container">
      <div className="inicio-left-image">
        <img src={ img3 } alt="Imagen 1" />
      </div>
      <div className="inicio-right-images">
        <img src={ img1 } alt="Imagen 3" />
        <img src={ img2 } alt="Imagen 2" />
      </div>
    </div>
  )
}
