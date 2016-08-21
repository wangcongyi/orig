module.exports = function(grunt) {
	
	grunt.initConfig({
		
		 pkg: grunt.file.readJSON('package.json'),
		 
		 transport : {
			 webqq : {
				 files : {
					 '.build' : ['main.js','drag.js','scale.js','range.js']
				 }
			 }
		 },
		 
		 concat : {
			 webqq : {
				 files : {
					 'dist/main.js' : ['.build/main.js','.build/drag.js','.build/scale.js','.build/range.js']
				 }
			 }
		 },
		 uglify : {
			 webqq : {
				 files : {
					 'dist/main.min.js' : ['dist/main.js']
 				 }
			 }
		 }
		
	});
	
	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.loadNpmTasks('grunt-cmd-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

  	grunt.registerTask('default', ['transport','concat','uglify']);

	
};