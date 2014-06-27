package com.tbs.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tbs.service.HomeService;

//import com.fasterxml.jackson.databind.ObjectMapper;


@Controller
public class HomeController {

	public static Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	public HomeService homeService; 
	
	@RequestMapping(value="/login")
	public ModelAndView login(HttpServletResponse response) throws IOException{
		
		homeService.getCredentials();
		return new ModelAndView(".home");
	}
	
	@RequestMapping(value="/upload")
	public ModelAndView upload(HttpServletResponse response) throws IOException{		
		
		return new ModelAndView("upload");
	}
	
	@RequestMapping(value="/importFile", method = RequestMethod.POST)
	public ModelAndView importFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		//response.setContentType("text/json;charset=UTF-8");
        
        
        try {
            // first check if the upload request coming in is a multipart request
            boolean isMultipart = FileUpload.isMultipartContent(request);
            logger.debug("content-length: " + request.getContentLength());
            logger.debug("method: " + request.getMethod());
            logger.debug("character encoding: " + request.getCharacterEncoding());
 
            if (isMultipart) {
                DiskFileUpload upload = new DiskFileUpload();
                List items = null;
 
                try {
                    // parse this request by the handler
                    // this gives us a list of items from the request
                    items = upload.parseRequest(request);
                    logger.debug("items: " + items.toString());
                } catch (FileUploadException ex) {
                	logger.debug("Failed to parse request", ex);
                }
                Iterator itr = items.iterator();
 
                while (itr.hasNext()) {
                    FileItem item = (FileItem) itr.next();
 
                    // check if the current item is a form field or an uploaded file
                    if (item.isFormField()) {
 
                        // get the name of the field
                        String fieldName = item.getFieldName();
                    } else {
 
                        // the item must be an uploaded file save it to disk. Note that there
                        // seems to be a bug in item.getName() as it returns the full path on
                        // the client's machine for the uploaded file name, instead of the file
                        // name only. To overcome that, I have used a workaround using
                        // fullFile.getName().
                        File fullFile = new File(item.getName());
                        File savedFile = new File("E:/uploads/", fullFile.getName());
                        try {
                            item.write(savedFile);
                        } catch (Exception ex) {
                        	logger.debug("Failed to save file", ex);
                        }
                    }
                }
 
            }
        } finally {
        	response.getWriter().write("{\"success\":\"true\"}");
        }
		return null;
	}

	@RequestMapping(value="/getData")
	public ModelAndView getData(HttpServletResponse response) throws IOException{
	
		/*ObjectMapper mapper = new ObjectMapper();
		
		Map map = new HashMap<String,String>();
		map.put("username", "username");
		map.put("isAdmin", "isAdmin");
		map.put("authenticated", "authenticated");
		map.put("loggedOut", "loggedOut");
		
		List list = new ArrayList<Map>();
		list.add(map);*/
		
		//String str= mapper.writeValueAsString(list);
		String str = "{\"Objects\" :[{\"id\":2999,\"name\":\"Som Awasthi\"},{\"id\":3000,\"name\":\"Arnav Awasthi\"},{\"id\":\"123\",\"name\":\"Arul\"}], \"objectCount\" : 100}";
		response.getWriter().write(str);	
		return null;
	}

}
