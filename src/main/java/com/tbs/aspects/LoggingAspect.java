package com.tbs.aspects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.After;

import com.tbs.controller.HomeController;

@Aspect
public class LoggingAspect {
	
	
	public static Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
	
	//@Before("execution(* com.tbs.controller.HomeController.login(..))")
	@Before("execution(* com.tbs..*.*(..))")
	public void logBefore(JoinPoint joinPoint) {
 
		logger.debug("Entering  "+joinPoint.getSignature().getName());
	}
	
	
	//@After("execution(* com.tbs.controller.HomeController.login(..))")
	@After("execution(* com.tbs..*.*(..))")
	public void logAfter(JoinPoint joinPoint) {
 
		logger.debug("Exiting  "+joinPoint.getSignature().getName());
 
	}
	
}
