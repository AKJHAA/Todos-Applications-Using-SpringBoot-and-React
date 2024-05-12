 package com.abhijeet.rest.webservices.restfulwebservices;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

//@Configuration
public class BasicAuthenticationSecurityConfiguration {
	
	//Filter Chain
	//Authenticate All Request
	//Basic Authentication
	//Disabling CSRF
	//STATELESS Rest Api
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		1. Response to prelight request doesn't pass acess control check
//		2. Basic Auth 
		
		return http
				.authorizeHttpRequests(
						auth ->
							auth
							.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
							.anyRequest().authenticated())
				.httpBasic(Customizer.withDefaults())
				.sessionManagement(
						session -> session.sessionCreationPolicy
						(SessionCreationPolicy.STATELESS))
				.csrf().disable()
				.build();
				
//		http.authorizeHttpRequests(
//				auth -> auth.anyRequest().authenticated()
//				);
//		http.httpBasic(Customizer.withDefaults());
//		http.sessionManagement(
//				session -> session.sessionCreationPolicy
//				(SessionCreationPolicy.STATELESS));
//		http.csrf().disable();
//		
//		return http.build();
//		
	}
}
