 // import jQuery from 'jquery';
 var React = require('react');
 var ReactDOM = require('react-dom');
var Remarkable = require('remarkable');


var data = [
	  {id: 1, author: "Pete Hunt", text: "This is one comment"},
	  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var Comment = React.createClass({
	rawMarkup:function (){ 
		var md = new Remarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return { __html: rawMarkup };
	},
	render: function() {
		var md = new Remarkable();
		return (
			<div className = "comment"> 
				<h2 className="commentAuthor" > 
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		)
	}
});

var CommentForm = React.createClass({ 
	render: function() {
		return(
			<form className="commentForm">
				<input type="text" placeholder="Your name" /> <br/>
				<input type="text" placeholder="Say something..." />
				<input type="submit" value="Post" />
		        </form>		
		)
	}	
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author} key = {comment.id} > 
					{ comment.text } 
				</Comment>
			)
		});

		return(
			<div className="commentList"> 
				{ commentNodes } 
			</div>
		)

	}
});


 var CommentBox = React.createClass({
   render: function() {
     return ( 
	     < div className = "commentBox" >
		     <h1> Comment </h1>
		     <CommentList data={data} />
		     <CommentForm />
	     < /div>
     )
   }
 });


 ReactDOM.render( < CommentBox /> ,
   document.getElementById('app')
 );
