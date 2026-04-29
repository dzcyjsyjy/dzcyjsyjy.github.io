// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// 移动端菜单切换
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// 点击菜单项后关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// 数据统计数字动画
let numbersAnimated = false;

function animateNumbers() {
    if (numbersAnimated) return;
    numbersAnimated = true;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateNumber();
    });
}

// 页面加载后立即触发数字动画
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateNumbers();
    }, 500);
});

// 使用Intersection Observer触发数字动画
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(statsSection);
}

// 组织架构展开/收起功能
document.querySelectorAll('.org-header').forEach(header => {
    header.addEventListener('click', function() {
        const children = this.nextElementSibling;
        const toggle = this.querySelector('.org-toggle');
        
        if (children && children.classList.contains('org-children')) {
            children.classList.toggle('expanded');
            if (toggle) {
                toggle.classList.toggle('expanded');
            }
        }
    });
});

// 默认展开第一级
const firstLevelChildren = document.querySelector('.org-tree > .org-node > .org-children');
if (firstLevelChildren) {
    firstLevelChildren.classList.add('expanded');
    const firstToggle = document.querySelector('.org-tree > .org-node > .org-header .org-toggle');
    if (firstToggle) {
        firstToggle.classList.add('expanded');
    }
}

// 新闻标签页切换
const tabBtns = document.querySelectorAll('.tab-btn');
const newsCards = document.querySelectorAll('.news-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有按钮的active类
        tabBtns.forEach(b => b.classList.remove('active'));
        // 给当前按钮添加active类
        this.classList.add('active');
        
        const tab = this.getAttribute('data-tab');
        
        // 显示/隐藏新闻卡片
        newsCards.forEach(card => {
            if (tab === 'all') {
                card.style.display = 'block';
            } else {
                const category = card.getAttribute('data-category');
                if (category === tab) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        
        // 这里可以添加AJAX提交逻辑
        // 目前只显示提示信息
        alert('感谢您的留言！我们会尽快与您联系。');
        
        // 清空表单
        this.reset();
    });
}

// 滚动动画
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .team-member, .news-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// 初始化滚动动画
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .team-member, .news-card, .stat-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 延迟执行以确保初始状态已应用
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll);

// 创新创业大赛报名表单功能
const registerBtn = document.getElementById('register-btn');
const cancelBtn = document.getElementById('cancel-btn');
const registerFormContainer = document.getElementById('register-form-container');
const registerForm = document.getElementById('register-form');

// 点击立即报名按钮显示表单
if (registerBtn) {
    registerBtn.addEventListener('click', function() {
        registerFormContainer.classList.add('show');
        // 滚动到表单位置
        registerFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// 点击取消按钮隐藏表单
if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
        registerFormContainer.classList.remove('show');
        // 滚动回报名区域
        const registerSection = document.querySelector('.competition-register');
        if (registerSection) {
            registerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// 报名表单提交处理
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 验证必填字段
        if (!data.group || !data.category || !data.project_name || !data.leader_name || !data.phone || !data.email) {
            alert('请填写必填项：参赛组别、参赛领域、项目名称、负责人姓名、联系电话和电子邮箱');
            return;
        }
        
        if (!data.agree) {
            alert('请阅读并同意《大赛参赛须知》和《知识产权声明》');
            return;
        }
        
        // 显示成功提示
        alert('报名成功！我们会尽快审核您的参赛项目。');
        
        // 清空表单并隐藏
        this.reset();
        registerFormContainer.classList.remove('show');
        
        // 滚动回报名区域
        const registerSection = document.querySelector('.competition-register');
        if (registerSection) {
            registerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}
