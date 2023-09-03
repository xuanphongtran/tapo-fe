const ZoomImageModal = ({ imgSource }) => {
    return(
        <div className="modal fade" id="zoomImageModal" tabIndex="-1" aria-labelledby="zoomImageModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <img className="rounded-3" alt="" src={ imgSource } style={{width:'100%'}}/>
            </div>
        </div>
        
    )
}
export default ZoomImageModal